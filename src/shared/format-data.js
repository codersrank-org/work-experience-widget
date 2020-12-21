import { differenceInMonths } from './difference-in-months';

export const formatData = (workExperience = [], maxItems) => {
  if (maxItems) {
    // eslint-disable-next-line
    workExperience = workExperience.slice(0, maxItems);
  }
  let items = [];
  const companyMapping = {};
  let originalIndex = 0;

  workExperience.forEach((job) => {
    if (job.company in companyMapping) {
      items[companyMapping[job.company]] = {
        ...items[companyMapping[job.company]],
        titles: [
          ...items[companyMapping[job.company]].titles,
          {
            originalIndex: (originalIndex += 1),
            title: job.title,
            description: job.description,
            start_date: job.start_date,
            end_date: job.end_date,
            location: job.location,
            is_current: job.is_current,
            highlighted_technologies: job.highlighted_technologies,
            other_technologies: job.other_technologies,
          },
        ],
      };
    } else {
      items = [
        ...items,
        {
          company: job.company,
          company_logo: job.company_logo || job.company_logo,
          titles: [
            {
              originalIndex: (originalIndex += 1),
              title: job.title,
              description: job.description,
              start_date: job.start_date,
              end_date: job.end_date,
              location: job.location,
              is_current: job.is_current,
              highlighted_technologies: job.highlighted_technologies,
              other_technologies: job.other_technologies,
            },
          ],
        },
      ];
      companyMapping[job.company] = items.length - 1;
    }
  });
  return items
    .map((item) => ({
      ...item,
      titles: item.titles
        .slice()
        .sort(
          (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
        ),
    }))
    .sort(
      (a, b) =>
        new Date(b.titles[0].start_date).getTime() -
        new Date(a.titles[0].start_date).getTime(),
    )
    .map((item) => {
      let totalMonths = 0;
      item.titles.forEach((title) => {
        const end_date = title.is_current ? new Date() : new Date(title.end_date);
        totalMonths += differenceInMonths(new Date(title.start_date), end_date);
      });
      return { ...item, totalMonths };
    });
};
