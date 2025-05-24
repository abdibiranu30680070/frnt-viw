import React, { useEffect, useRef, useState } from 'react';
import teamMembers from './teamMembers.json'; // path relative to your file
import './team.css';

// Import images separately
import anitaPhoto from './images/doctor2.jpg';
import vincentPhoto from './images/doctor1.jpg';
import metiPhoto from './images/meti_x.jpg';
import ruki from './images/ruki.jpg';
import idosa from './images/idosa.jpg';
const Team = () => {
  const teamRefs = useRef([]);
  const sectionRef = useRef(null);

  // State to store likes per member
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem("team-likes");
    return saved ? JSON.parse(saved) : {};
  });

  // Replace photo paths with imported images
  const members = teamMembers.map(member => ({
    ...member,
    photo:
      member.photo.includes('doctor2') ? anitaPhoto :
      member.photo.includes('doctor1') ? vincentPhoto :
      member.photo.includes('meti_x') ? metiPhoto :
         member.photo.includes('ruki') ? ruki :
           member.photo.includes('idosa') ? idosa :
         
      member.photo
  }));

  // Save likes to localStorage when updated
  useEffect(() => {
    localStorage.setItem("team-likes", JSON.stringify(likes));
  }, [likes]);

  const handleLike = (name) => {
    setLikes((prev) => {
      const liked = prev[name] || 0;
      if (liked === 0) {
        return { ...prev, [name]: 1 };
      } else {
        return { ...prev, [name]: 0 };
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            const children = entry.target.querySelectorAll('.team-photo, .team-info > *');
            children.forEach((child, idx) => {
              child.style.animationDelay = `${idx * 0.15}s`;
              child.classList.add('animate-child');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const refs = teamRefs.current;
    refs.forEach((ref) => ref && observer.observe(ref));

    return () => refs.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  return (
    <section className="team-section" ref={sectionRef} aria-labelledby="team-heading">
      <h2 id="team-heading" className="section-title">Our Team</h2>

      <div className="team-container">
        {members.map((member, idx) => (
          <article
            key={member.name}
            className={`team-member ${idx % 2 === 1 ? 'right-image' : ''}`}
            ref={(el) => (teamRefs.current[idx] = el)}
            aria-labelledby={`member-${idx}-name`}
          >
            {idx % 2 === 0 && (
              <img
                src={member.photo}
                alt={`${member.name}, ${member.position}`}
                className="team-photo"
                loading="lazy"
              />
            )}
            <div className="team-info">
              <h3 id={`member-${idx}-name`}>{member.name}</h3>
              <p className="position">{member.position}</p>
              <p>{member.description}</p>

              {/* Like Button */}
              <button
                className={`btn btn-sm ${likes[member.name] ? 'btn-danger' : 'btn-outline-danger'} me-2`}
                onClick={() => handleLike(member.name)}
                aria-pressed={likes[member.name] ? 'true' : 'false'}
              >
                ❤️ {likes[member.name] ? 'Unlike' : 'Like'} ({likes[member.name] || 0})
              </button>

              {/* Social Links */}
              <div className="social-icons" role="navigation" aria-label="Social media links">
                {Object.entries(member.socials).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    className="social-btn"
                    aria-label={`${platform} profile for ${member.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
            {idx % 2 === 1 && (
              <img
                src={member.photo}
                alt={`${member.name}, ${member.position}`}
                className="team-photo"
                loading="lazy"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Team;