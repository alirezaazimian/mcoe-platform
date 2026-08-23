import * as React from "react"
import { useSize } from "@/hooks/use-size"
import { cn } from "@/lib/utils"

const FALLBACK_IMAGE_URL =
  "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png"

const WIX_MEDIA_HOSTS = ["static.wixstatic.com"]
const DEFAULT_TRANSFORM_WIDTH = 1024
const DEVICE_PIXEL_RATIOS = [1, 2, 3]
const MAX_DIMENSION = 6000

/**
 * @typedef {{
 *   baseUrl: string,
 *   filename: string
 * }} ParsedWixMedia
 */

/**
 * @typedef {{
 *   x: number,
 *   y: number
 * }} FocalPoint
 */

/**
 * @typedef {{
 *   width: number,
 *   height?: number,
 *   crop: boolean,
 *   focalPoint?: FocalPoint,
 *   quality: number
 * }} TransformOptions
 */

/**
 * @typedef {React.HTMLAttributes<HTMLSpanElement> & {
 *   aspectRatio?: string | number,
 *   children?: React.ReactNode
 * }} ImageWrapperProps
 */

/**
 * @typedef {Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
 *   parsed: ParsedWixMedia,
 *   fittingType?: string,
 *   focalPoint?: FocalPoint,
 *   quality?: number,
 *   aspectRatio?: string | number
 * }} ResponsiveImageProps
 */

/**
 * @typedef {React.ImgHTMLAttributes<HTMLImageElement> & {
 *   fittingType?: string,
 *   originWidth?: number,
 *   originHeight?: number,
 *   focalPointX?: number,
 *   focalPointY?: number,
 *   quality?: number
 * }} ImageProps
 */

/**
 * Detects a Wix Media URL and strips any existing /v1/ transform.
 *
 * @param {string} src
 * @returns {ParsedWixMedia | null}
 */
function parseWixMediaUrl(src) {
  try {
    const url = new URL(src)

    if (!WIX_MEDIA_HOSTS.includes(url.hostname)) {
      return null
    }

    const v1 = url.pathname.indexOf("/v1/")
    const basePath =
      v1 === -1
        ? url.pathname
        : url.pathname.slice(0, v1)

    const filename = basePath.split("/").pop()

    if (!filename || /\.svg$/i.test(filename)) {
      return null
    }

    return {
      baseUrl: `${url.origin}${basePath}`,
      filename,
    }
  } catch {
    return null
  }
}

/**
 * @param {number} n
 */
const clampDim = (n) =>
  Math.min(
    Math.max(Math.round(n), 1),
    MAX_DIMENSION
  )

/**
 * @param {number} n
 */
const clamp01 = (n) =>
  Math.min(
    1,
    Math.max(0, n)
  )

/**
 * Builds a Wix Media transform URL.
 *
 * @param {ParsedWixMedia} parsed
 * @param {TransformOptions} options
 */
function buildTransformUrl(
  { baseUrl, filename },
  {
    width,
    height,
    crop,
    focalPoint,
    quality,
  }
) {
  const params = [
    `w_${clampDim(width)}`,
    `h_${clampDim(height || width)}`,
  ]

  if (crop) {
    params.push(
      focalPoint
        ? `fp_${clamp01(focalPoint.x).toFixed(2)}_${clamp01(
            focalPoint.y
          ).toFixed(2)}`
        : "al_c"
    )
  }

  params.push(
    `q_${quality}`,
    "usm_0.66_1.00_0.01",
    "enc_webp",
    "quality_auto"
  )

  const outputName = /\.gif$/i.test(filename)
    ? filename
    : filename.replace(/\.[a-z0-9]+$/i, "") + ".webp"

  return `${baseUrl}/v1/${
    crop ? "fill" : "fit"
  }/${params.join(",")}/${outputName}`
}

/**
 * @param {ParsedWixMedia} parsed
 * @param {TransformOptions} options
 */
function buildSrcSet(parsed, options) {
  return DEVICE_PIXEL_RATIOS.map((dpr) => {
    const url = buildTransformUrl(parsed, {
      ...options,
      width: options.width * dpr,
      height: options.height
        ? options.height * dpr
        : undefined,
    })

    return `${url} ${dpr}x`
  }).join(", ")
}

const ImageWrapper = React.forwardRef(
  /**
   * @param {ImageWrapperProps} props
   * @param {React.ForwardedRef<HTMLSpanElement>} ref
   */
  (
    {
      aspectRatio,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(
        "inline-block relative",
        className
      )}
      style={{
        aspectRatio,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
)

ImageWrapper.displayName = "ImageWrapper"

const ResponsiveImage = React.forwardRef(
  /**
   * @param {ResponsiveImageProps} props
   * @param {React.ForwardedRef<HTMLImageElement>} parentRef
   */
  (
    {
      parsed,
      fittingType = "fill",
      focalPoint,
      quality = 90,
      className,
      style,
      aspectRatio,
      onLoad,
      ...props
    },
    parentRef
  ) => {
    const wrapperRef =
      React.useRef(
        /** @type {HTMLSpanElement | null} */ (null)
      )

    const imgRef =
      React.useRef(
        /** @type {HTMLImageElement | null} */ (null)
      )

    const size = useSize(wrapperRef)

    const [loaded, setLoaded] =
      React.useState(false)

    React.useImperativeHandle(
      parentRef,
      () => imgRef.current
    )

    React.useEffect(() => {
      setLoaded(false)
    }, [parsed.baseUrl])

    const crop = fittingType !== "fit"

    /** @type {TransformOptions | null} */
    const options = size
      ? {
          width:
            size.width ||
            DEFAULT_TRANSFORM_WIDTH,

          height: size.height
            ? size.height
            : undefined,

          crop,

          focalPoint: crop
            ? focalPoint
            : undefined,

          quality,
        }
      : null

    return (
      <ImageWrapper
        ref={wrapperRef}
        aspectRatio={aspectRatio}
        className={className}
        style={style}
      >
        {options && !loaded && (
          <img
            src={buildTransformUrl(
              parsed,
              {
                ...options,

                width: 20,

                height: options.height
                  ? Math.max(
                      1,
                      Math.round(
                        (20 *
                          options.height) /
                          options.width
                      )
                    )
                  : undefined,

                quality: 20,
              }
            )}
            alt=""
            aria-hidden="true"
            className="
              w-full
              h-full
              inset-0
              absolute
            "
            style={{
              objectFit:
                fittingType === "fit"
                  ? "contain"
                  : "cover",

              filter: "blur(10px)",
              transform: "scale(1.1)",
            }}
          />
        )}

        {options && (
          <img
            ref={imgRef}
            src={buildTransformUrl(
              parsed,
              options
            )}
            srcSet={buildSrcSet(
              parsed,
              options
            )}
            loading="lazy"
            className={cn(
              "w-full h-full inset-0 absolute",

              fittingType === "fit"
                ? "object-contain"
                : "object-cover"
            )}
            onLoad={(event) => {
              setLoaded(true)
              onLoad?.(event)
            }}
            {...props}
          />
        )}
      </ImageWrapper>
    )
  }
)

ResponsiveImage.displayName =
  "ResponsiveImage"

/**
 * Image with Wixstatic Media Platform
 * optimization support.
 */
const Image = React.forwardRef(
  /**
   * @param {ImageProps} props
   * @param {React.ForwardedRef<HTMLImageElement>} ref
   */
  (
    {
      src,
      fittingType = "fill",
      originWidth,
      originHeight,
      focalPointX,
      focalPointY,
      quality = 90,
      onError,
      ...props
    },
    ref
  ) => {
    const [imgSrc, setImgSrc] =
      React.useState(src)

    React.useEffect(() => {
      setImgSrc(src)
    }, [src])

    /** @type {React.ImgHTMLAttributes<HTMLImageElement>} */
    const imageProps = {
      ...props,

      onError: (event) => {
        setImgSrc(
          FALLBACK_IMAGE_URL
        )

        onError?.(event)
      },
    }

    if (!src) {
      return (
        <img
          ref={ref}
          src={FALLBACK_IMAGE_URL}
          {...imageProps}
          data-empty-image
        />
      )
    }

    const parsed =
      imgSrc === FALLBACK_IMAGE_URL
        ? null
        : parseWixMediaUrl(
            String(imgSrc)
          )

    if (!parsed) {
      const isErrorUrl =
        imgSrc === FALLBACK_IMAGE_URL

      return (
        <img
          ref={ref}
          src={imgSrc}
          {...imageProps}
          data-error-image={
            isErrorUrl || undefined
          }
        />
      )
    }

    /** @type {FocalPoint | undefined} */
    const focalPoint =
      typeof focalPointX === "number" &&
      typeof focalPointY === "number"
        ? {
            x: focalPointX,
            y: focalPointY,
          }
        : undefined

    const aspectRatio =
      originWidth && originHeight
        ? `${originWidth} / ${originHeight}`
        : undefined

    return (
      <ResponsiveImage
        ref={ref}
        parsed={parsed}
        fittingType={fittingType}
        focalPoint={focalPoint}
        quality={quality}
        aspectRatio={aspectRatio}
        {...imageProps}
      />
    )
  }
)

Image.displayName = "Image"

export { Image }