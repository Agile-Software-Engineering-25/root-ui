/** this is a list of all applications (micro-services) that are accessible by the root config */
export default [
  {
    name: "@agile-software-engineering/ase-01-room-booking-service",
    basename: "/room-booking",
  },
  {
    name: "@agile-software-engineering/ase-02-timetable-service",
    basename: "/timetable",
  },
  {
    name: "@agile-software-engineering/ase-03-parking-service",
    basename: "/parkingspot",
  },
  {
    name: "stundenplan", // <---- TODO: Change here to your project's name. Then in importMap.json add that name and the link to your ui.
    basename: "/timetable",
  },
  {
    name: "@agile-software-engineering/ase-05-newsfeed-service",
    basename: "/newsfeed",
  },
  {
    name: "@agile-software-engineering/ase-06-antrag-service",
    basename: "/document-management/requests",
  },
  {
    name: "@agile-software-engineering/ase-07-base-data-service",
    basename: "/document-management/documents",
  },
  {
    name: "@agile-software-engineering/ase-09-studyunit-data-service",
    basename: "/masterdata/studycontent",
  },
  {
    name: "@agile-software-engineering/ase-11-persoenliche-daten",
    basename: "/data/person",
  },
  {
    name: "@agile-software-engineering/ase-11-stammdatenverwaltung",
    basename: "/masterdata/management",
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
