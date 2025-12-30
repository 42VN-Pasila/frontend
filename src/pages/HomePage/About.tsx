import cardSrc from "../../assets/card-back 1.png";
import { useEffect, useState } from "react";

type AboutCardProps = {
  name: string;
  role?: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  flipped: boolean;
};


const AboutCard = ({
  name,
  image,
  github,
  linkedin,
  email,
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

        <div
          className="
            absolute inset-0
            rounded-2xl
            bg-gradient-to-br
            from-slate-800
            to-slate-950
            border border-white/10
            shadow-[0_20px_40px_rgba(0,0,0,0.35)]
            flex flex-col items-center justify-end p-4
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="mt-3 flex gap-3 text-sm">
            {github && <a href={github}>GitHub</a>}
            {linkedin && <a href={linkedin}>LinkedIn</a>}
            {email && <a href={`mailto:${email}`}>Email</a>}
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
  github?: string;
  linkedin?: string;
  email?: string;
};

const TEAM: TeamMember[] = [
  {
    id: "huong",
    name: "Huong",
    image: cardSrc,
    github: "https://github.com/huong",
  },
  {
    id: "member-2",
    name: "Name 2",
    image: cardSrc,
  },
  {
    id: "member-3",
    name: "Name 3",
    image: cardSrc,
  },
  {
    id: "member-4",
    name: "Name 4",
    image: cardSrc,
  },
];


export const About = () => {
  // const [flipped, setFlipped] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(-1);


  useEffect(() => {
    const timers: number[] = [];

    TEAM.forEach((_, i) => {
      const timer = window.setTimeout(() => {
        setFlippedIndex(i);
      }, 700 + i * 150);

      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => (
            <AboutCard
              key={member.id}
              {...member}
              // flipped={flipped}
              flipped={i <= flippedIndex}

            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
