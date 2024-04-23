'use client';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { CiLinkedin } from 'react-icons/ci';

const FollowButtons = () => {
  return (
    <div className="flex items-center justify-center gap-2 p-2">
      <a href="https://github.com/ognjeeen">
        <FiGithub size={25} />
      </a>
      <a href="https://www.linkedin.com/in/ognjen-marinkovi%C4%87-a51722216/">
        <CiLinkedin size={35} />
      </a>
      <a href="https://www.instagram.com/ognjeeen/">
        <FaInstagram size={30} />
      </a>
      <a href="https://twitter.com/ognjeeen_">
        <FaXTwitter size={30} />
      </a>
    </div>
  );
};

export default FollowButtons;
