function mapAnswersToTags(answersObject) {
  const tags = new Set();

  const keywordMap = {
    // Subjects
    mathematics: ["mathematics", "math", "algebra", "calculus", "geometry"],
    science: ["science", "physics", "chemistry", "biology"],
    social_studies: ["social studies", "history", "geography", "civics"],
    english: ["english", "literature", "grammar", "language arts"],
    art_design: ["art", "design", "drawing", "painting", "sketch"],

    // Activity Preferences
    problem_solving: ["logical", "problem", "puzzle", "math"],
    performing: ["performing", "presenting", "theatre", "acting"],
    creative: ["designing", "creating", "craft", "art", "visual"],
    leadership: ["talking", "leading", "debate", "public speaking", "management"],
    reading: ["reading", "books", "literature", "novels", "research"],

    // Careers
    engineering: ["engineering", "engineer", "math", "technical"],
    medical: ["medical", "doctor", "nurse", "health", "bio"],
    law: ["law", "lawyer", "judge", "legal"],
    teaching: ["teaching", "teacher", "education"],
    police: ["police", "ips", "law enforcement", "crime"],
    defense: ["army", "navy", "airforce", "defense", "military"],
    hotel_management: ["hotel", "hospitality", "chef", "food"],
    fashion: ["fashion", "styling", "textile", "clothing", "design"],
    journalism: ["journalism", "news", "mass comm", "media"],
    photography: ["photography", "camera", "dslr", "visual media"],
    acting: ["acting", "drama", "theatre"],
    business: ["business", "entrepreneur", "startup"],
    finance: ["finance", "accountant", "ca", "commerce", "money"],
    data_science: ["data science", "ai", "artificial intelligence", "machine learning"],
    cybersecurity: ["cybersecurity", "ethical hacking", "hacking", "cyber", "security"],
    animation: ["game design", "animation", "games", "3d", "vfx"],
    diploma: ["diploma", "iti", "technician", "10th", "polytechnic"],
    govt_10: ["govt jobs (10th level)", "peon", "clerk", "ssc"],
    govt_12: ["govt jobs (12th level)", "railway", "ssc", "army clerk"],
    upsc: ["upsc", "civil services", "ias", "ips", "pcs"],
    architecture: ["architecture", "design", "interior", "autocad"],

    // Learning Preferences
    visual_learner: ["watching videos", "visual"],
    reader: ["reading books"],
    hands_on: ["hands-on", "practice", "experiment"],
    auditory: ["listening", "lectures", "audio"],

    // Motivation
    salary: ["salary", "money", "income"],
    innovation: ["innovation", "creativity", "idea", "disrupt"],
    service: ["helping", "support", "community"],
    prestige: ["prestige", "government", "power", "influence"],
    global_impact: ["global", "impact", "change", "world"],

    // Goals
    top_college: ["top college", "iit", "aiims", "nlu"],
    career_path: ["career path", "explore", "find career"],
    new_skills: ["learn", "new skills", "courses"],
    mentor: ["mentor", "guide"],
    govt_prep: ["government job", "ssc", "bank", "upsc", "railway"],

    // Study Level
    till_10: ["10th"],
    diploma_job: ["12th + diploma", "job after 12th"],
    ug_degree: ["ug", "btech", "ba", "bsc", "undergraduate"],
    pg_degree: ["pg", "mtech", "mba", "ma", "msc"],
    phd: ["phd", "research", "doctorate"]
  };

  const normalize = (text) =>
    text.toLowerCase().replace(/[^\w\s]/gi, "").trim();

  const matchToTag = (text) => {
    const normText = normalize(text);

    for (const [tag, keywords] of Object.entries(keywordMap)) {
      if (keywords.some((kw) => normText.includes(kw))) {
        tags.add(tag);
      }
    }
  };

  // Loop through all user answers
  Object.values(answersObject).flat().forEach((answer) => {
    if (typeof answer === "string") {
      matchToTag(answer);
    }
  });

  return Array.from(tags);
}

module.exports = mapAnswersToTags;
