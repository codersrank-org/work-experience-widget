import { differenceInMonths } from './difference-in-months';

export const formatData = (profile = {}) => {
  const workExperience = profile.workExperience || [];
  let items = [];
  const companyMapping = {};
  let originalIndex = 0;

  workExperience.forEach((job) => {
    if (job.companyName in companyMapping) {
      items[companyMapping[job.companyName]] = {
        ...items[companyMapping[job.companyName]],
        titles: [
          ...items[companyMapping[job.companyName]].titles,
          {
            originalIndex: (originalIndex += 1),
            title: job.title,
            description: job.description,
            startDate: job.startDate,
            endDate: job.endDate,
            location: job.location,
            currentlyWorkingHere: job.currentlyWorkingHere,
            highlightedTechnologies: job.highlightedTechnologies,
            otherTechnologies: job.otherTechnologies,
          },
        ],
      };
    } else {
      items = [
        ...items,
        {
          companyName: job.companyName,
          companyLogoUrl: job.companyLogoUrl || job.companyLogoURL,
          titles: [
            {
              originalIndex: (originalIndex += 1),
              title: job.title,
              description: job.description,
              startDate: job.startDate,
              endDate: job.endDate,
              location: job.location,
              currentlyWorkingHere: job.currentlyWorkingHere,
              highlightedTechnologies: job.highlightedTechnologies,
              otherTechnologies: job.otherTechnologies,
            },
          ],
        },
      ];
      companyMapping[job.companyName] = items.length - 1;
    }
  });
  return items
    .map((item) => ({
      ...item,
      titles: item.titles
        .slice()
        .sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        ),
    }))
    .sort(
      (a, b) =>
        new Date(b.titles[0].startDate).getTime() -
        new Date(a.titles[0].startDate).getTime(),
    )
    .map((item) => {
      let totalMonths = 0;
      item.titles.forEach((title) => {
        const endDate = title.currentlyWorkingHere ? new Date() : new Date(title.endDate);
        totalMonths += differenceInMonths(new Date(title.startDate), endDate);
      });
      return { ...item, totalMonths };
    });
};
