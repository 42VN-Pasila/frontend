import cardSrc from "../../assets/card-back-2.png";
import Ed from "../../assets/Ed.png";
import Edd from "../../assets/Edd.png";
import Eddy from "../../assets/Eddy.png";
import Plank from "../../assets/Plank 1.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import HomePageNavBar from "./HomePageNavBar";
import Footer from "@/shared/components/Footer";

type AboutCardProps = {
  name: string;
  role: string;
  bio: string;
  image: string;
  github: string;
  linkedin: string;
  email: string;
  imagePosition?: string;
  flipped: boolean;
};

const AboutCard = ({
  name,
  image,
  role,
  bio,
  github,
  linkedin,
  email,
  imagePosition,
  flipped,
}: AboutCardProps) => {
  return (
    <div className="w-[260px] aspect-[5/7] perspective-[1000px]">
      <div
        className={`
          relative w-full h-full
          transition-transform duration-700
          [transform-style:preserve-3d]
          ${flipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* BACK FACE (visible first) */}
        <div
          className="
            absolute inset-0
            rounded-2xl
            overflow-hidden
            [backface-visibility:hidden]
          "
        >
          <img
            src={cardSrc}
            alt="Card back"
            className="w-full h-full object-cover"
          />
        </div>

        {/* FRONT FACE (revealed after flip) */}
        <div
          className="
            absolute inset-0
            rounded-2xl
            bg-gradient-to-br
            from-slate-800
            to-slate-950
            border border-white/10
            shadow-[0_20px_40px_rgba(0,0,0,0.35)]
            flex flex-col
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          {/* Top */}
          <div className="flex flex-col items-center pt-6">
            <img
              src={image}
              alt={name}
              className={`w-24 h-24 rounded-full mb-4 object-cover ${imagePosition ?? "object-center"}`}
            />
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-md text-white/60 mb-1">{role}</p>
            <p className="mt-2 text-md text-white/60 text-center px-6 leading-relaxed">
              {bio}
            </p>
          </div>

          {/* Bottom */}
          <div className="mt-auto pb-6 flex gap-5 justify-center">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on GitHub`}
                className="text-white/70 hover:text-white transition-colors"
              >
                <GitHubIcon fontSize="medium" />
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="text-white/70 hover:text-white transition-colors"
              >
                <LinkedInIcon fontSize="medium" />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                className="text-white/70 hover:text-white transition-colors"
              >
                <EmailIcon fontSize="medium" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

type TeamMember = {
  id: string;
  name: string;
  image: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  imagePosition?: string;
};

const TEAM: TeamMember[] = [
  {
    id: "huong",
    name: "Huong",
    image: Ed,
    role: "Some role",
    bio: "Her flop era is lowk serving ❤️. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    github: "https://github.com/huong",
    linkedin: "https://linkedin.com",
    email: "huongemail@gmail.com",
    imagePosition: "object-top",
  },
  {
    id: "member-2",
    name: "Kha",
    image: Edd,
    role: "Some role",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam lorem, tempor vel tellus ligula.",
    github: "https://github.com/huong",
    linkedin: "https://linkedin.com",
    email: "huongemail@gmail.com",
    imagePosition: "object-top",
  },
  {
    id: "member-3",
    name: "Tan",
    image: Eddy,
    role: "Some role",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam lorem, tempor vel tellus ligula.",
    github: "https://github.com/huong",
    linkedin: "https://linkedin.com",
    email: "huongemail@gmail.com",
    imagePosition: "object-top",
  },
  {
    id: "member-4",
    name: "Triet",
    image: Plank,
    role: "Some role",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam lorem, tempor vel tellus ligula.",
    github: "https://github.com/huong",
    linkedin: "https://linkedin.com",
    email: "huongemail@gmail.com",
    imagePosition: "object-top",
  },
];

export const About = () => {
  // const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(-1);

  useEffect(() => {
    const timers: number[] = [];

    TEAM.forEach((_, i) => {
      const timer = window.setTimeout(
        () => {
          setFlippedIndex(i);
        },
        300 + i * 150,
      );

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <HomePageNavBar />
      <main className="flex flex-col min-h-[100dvh]">
        <section className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-[1200px]">
            <div
              className="
              grid gap-8 place-items-center
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
            "
            >
              {TEAM.map((member, i) => (
                <AboutCard
                  key={member.id}
                  {...member}
                  flipped={i <= flippedIndex}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
