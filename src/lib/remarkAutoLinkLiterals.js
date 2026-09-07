const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s<>"']+|(?<![@\w])(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}(?:[/?#][^\s<>"']*)?/giu;
const TRAILING_PUNCTUATION = /[.,!?;:،؛؟)\]}»]+$/u;


function linkifyText(value) {
  const nodes = [];
  let cursor = 0;

  for (const match of value.matchAll(URL_PATTERN)) {
    const start = match.index ?? 0;
    const rawValue = match[0];
    const visibleValue = rawValue.replace(
      TRAILING_PUNCTUATION,
      ''
    );
    const trailingValue = rawValue.slice(
      visibleValue.length
    );

    if (!visibleValue) {
      continue;
    }

    if (start > cursor) {
      nodes.push({
        type: 'text',
        value: value.slice(cursor, start),
      });
    }

    nodes.push({
      type: 'link',
      url: /^https?:\/\//iu.test(visibleValue)
        ? visibleValue
        : `https://${visibleValue}`,
      title: null,
      children: [
        {
          type: 'text',
          value: visibleValue,
        },
      ],
    });

    if (trailingValue) {
      nodes.push({
        type: 'text',
        value: trailingValue,
      });
    }

    cursor = start + rawValue.length;
  }

  if (!nodes.length) {
    return [
      {
        type: 'text',
        value,
      },
    ];
  }

  if (cursor < value.length) {
    nodes.push({
      type: 'text',
      value: value.slice(cursor),
    });
  }

  return nodes;
}


function transformNode(node) {
  if (
    !node?.children ||
    node.type === 'link' ||
    node.type === 'linkReference' ||
    node.type === 'code' ||
    node.type === 'inlineCode' ||
    node.type === 'html'
  ) {
    return;
  }

  node.children = node.children.flatMap(
    (child) => {
      if (child.type === 'text') {
        return linkifyText(child.value);
      }

      transformNode(child);
      return child;
    }
  );
}


export default function remarkAutoLinkLiterals() {
  return (tree) => {
    transformNode(tree);
  };
}
