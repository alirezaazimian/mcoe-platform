import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Linkedin,
  UserRound,
} from 'lucide-react';

import { djangoApi } from '@/api/djangoApi';
import { Image } from '@/components/ui/image';
import Reveal from '@/components/ui/Reveal';
import MemberResumeModal from '@/components/workinggroups/MemberResumeModal';
import { useLanguage } from '@/lib/LanguageContext';


export default function TeamSection({
  groupSlug,
}) {
  const {
    language,
    isRTL,
  } = useLanguage();
  const [members, setMembers] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [selectedMember, setSelectedMember] =
    useState(null);
  const ForwardArrow = isRTL
    ? ArrowLeft
    : ArrowRight;
  const closeResume = useCallback(
    () => setSelectedMember(null),
    []
  );

  useEffect(() => {
    setLoading(true);

    djangoApi.workingGroupMembers
      .listByGroup(groupSlug)
      .then(setMembers)
      .catch((error) => {
        console.error(
          'Failed to load working group members:',
          error
        );
        setMembers([]);
      })
      .finally(() =>
        setLoading(false)
      );
  }, [groupSlug]);

  if (loading) {
    return (
      <div
        className="wg-team-grid"
        aria-busy="true"
      >
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="wg-member-card wg-team-skeleton animate-pulse"
          >
            <div className="wg-member-photo bg-[#EFE7DA]" />
            <div className="mx-auto mb-2 h-4 w-2/3 rounded-full bg-[#EFE7DA]" />
            <div className="mx-auto h-3 w-1/2 rounded-full bg-[#EFE7DA]" />
          </div>
        ))}
      </div>
    );
  }

  if (!members.length) return null;

  const locale = language === 'en'
    ? 'en'
    : 'fa';
  const heading = isRTL
    ? 'اعضای این کارگروه'
    : 'Members of This Group';
  const subheading = isRTL
    ? 'برای مشاهده پروفایل و رزومه هر عضو، کارت او را انتخاب کنید.'
    : 'Select any member card to view their profile and resume.';

  return (
    <section className="wg-team-section">
      <Reveal>
        <div className="wg-section-heading">
          <span aria-hidden="true" />
          <div>
            <small>
              {isRTL
                ? 'اعضای تخصصی'
                : 'Specialist Members'}
            </small>
            <h2>{heading}</h2>
          </div>
        </div>
        <p className="wg-team-intro">
          {subheading}
        </p>
      </Reveal>

      <div className="wg-team-grid">
        {members.map((member, index) => {
          const name =
            member[`name_${locale}`] ||
            member.name_fa ||
            member.name_en ||
            '';
          const role =
            member[`role_${locale}`] ||
            member.role_fa ||
            member.role_en ||
            '';
          const summary =
            member[`summary_${locale}`] ||
            member.summary_fa ||
            member.summary_en ||
            '';

          return (
            <Reveal
              key={member.id || index}
              delay={(index % 4) * 0.055}
              className="h-full"
            >
              <button
                type="button"
                data-mcoe-liquid="off"
                className="wg-member-card"
                onClick={() =>
                  setSelectedMember(member)
                }
                aria-haspopup="dialog"
                aria-label={
                  isRTL
                    ? `مشاهده رزومه ${name}`
                    : `View ${name}'s resume`
                }
              >
                <div className="wg-member-photo">
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={name}
                      className="h-full w-full object-contain"
                      fittingType="fit"
                    />
                  ) : (
                    <div className="wg-member-fallback">
                      <UserRound aria-hidden="true" />
                    </div>
                  )}
                </div>

                <div className="wg-member-body">
                  <div className="wg-member-name-row">
                    <h3>{name}</h3>
                    {member.linkedin_url && (
                      <Linkedin aria-hidden="true" />
                    )}
                  </div>
                  {role && (
                    <p className="wg-member-role">
                      {role}
                    </p>
                  )}
                  {summary && (
                    <p className="wg-member-summary">
                      {summary}
                    </p>
                  )}
                  <span className="wg-member-more">
                    {isRTL
                      ? 'مشاهده رزومه'
                      : 'View resume'}
                    <ForwardArrow aria-hidden="true" />
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      <MemberResumeModal
        member={selectedMember}
        onClose={closeResume}
      />
    </section>
  );
}
