export const RESUME_SCHEMA = `
Return ONLY valid JSON.

{
  "contact":{
    "name":"",
    "email":"",
    "phone":"",
    "linkedin":"",
    "github":"",
    "portfolio":"",
    "location":""
  },

  "summary":"",

  "skills":{
    "languages":[],
    "frameworks":[],
    "libraries":[],
    "databases":[],
    "cloud":[],
    "tools":[],
    "concepts":[],
    "other":[]
  },

  "projects":[
    {
      "title":"",
      "duration":"",
      "description":[],
      "techStack":[]
    }
  ],

  "experience":[
    {
      "company":"",
      "role":"",
      "duration":"",
      "description":[]
    }
  ],

  "education":[
    {
      "degree":"",
      "college":"",
      "year":"",
      "cgpa":""
    }
  ],

  "certifications":[],

  "achievements":[],

  "changes":[
    {
      "section":"",
      "before":"",
      "after":"",
      "reason":""
    }
  ]
}
`;
