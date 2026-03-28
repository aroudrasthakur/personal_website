import { motion } from 'motion/react';

interface SkillTagsProps {
  skills: string[];
}

export default function SkillTags({ skills }: SkillTagsProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          className="skill-badge"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{
            delay: index * 0.03,
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
          whileHover={{
            scale: 1.08,
            transition: { duration: 0.2 },
          }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}
