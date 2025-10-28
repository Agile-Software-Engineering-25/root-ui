/** this is a list of all applications (micro-services) that are accessible by the root config */
export default [
  {
    name: "@agile-software-engineering/ase-01-room-booking-service",
    basename: "/room-booking",
  },
  {
    name: "newsfeed", // <---- TODO: Change here to your project's name. Then in importMap.json add that name and the link to your ui.
    basename: "/document-management/newsfeed",
  },
  {
    name: "parkplatzanalyse", // <---- TODO: Change here to your project's name. Then in importMap.json add that name and the link to your ui.
    basename: "/parkingspot",
  },
  {
    name: "stundenplan", // <---- TODO: Change here to your project's name. Then in importMap.json add that name and the link to your ui.
    basename: "/timetable",
  },
  {
    name: "@agile-software-engineering/ase-07-base-data-service",
    basename: "/document-management/documents",
  },
  {
    name: "@agile-software-engineering/ase-06-antrag-service",
    basename: "/document-management/requests",
  },
  {
    name: "@agile-software-engineering/ase-11-persoenliche-daten",
    basename: "/data/person",
  },
  {
    name: "studieninhalt", // <---- TODO: Change here to your project's name. Then in importMap.json add that name and the link to your ui.
    basename: "/data/study",
  },
  {
    name: "@agile-software-engineering/ase-11-stammdatenverwaltung",
    basename: "/masterdata-management",
  },
  {
    name: "@agile-software-engineering/ase-12-lecturer-service",
    basename: "/exams",
  },
  {
    name: "@agile-software-engineering/ase-13-student-service",
    basename: "/exams",
  },
  {
    name: "@agile-software-engineering/ase-14-examination-service",
    basename: "/exams",
  },
  {
    name: "@agile-software-engineering/ase-15-notification-service",
    basename: "/",
  },
];
