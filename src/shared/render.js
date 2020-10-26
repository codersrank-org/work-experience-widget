import { companyLogo } from './company-logo';
import { differenceInMonths } from './difference-in-months';

export const render = ({ data: workExperience, logos, preloader } = {}) => {
  const workExperienceLocation = (we) => {
    const location = we.titles[0].location;
    if (location === 'Remote, Earth') return 'Remote';
    return location || '';
  };
  const formatInterval = (months) => {
    let output = '';

    if (months === 0) return 'Less than a month';

    if (months >= 12) {
      output += Math.floor(months / 12);
      output += ' year';
      if (Math.floor(months / 12) !== 1) output += 's';
    }

    if (months % 12 !== 0) {
      if (months >= 12) output += ' ';
      output += months % 12;
      output += ' month';
      if (months % 12 !== 1) output += 's';
    }

    return output;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const formatter = Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });
    return formatter.format(new Date(date));
  };

  const calculateMonths = (startDate, endDate, currentlyWorkingHere) => {
    const end = currentlyWorkingHere ? new Date() : new Date(endDate);
    return differenceInMonths(new Date(startDate), end);
  };

  const dates = (item, showInterval = true) => {
    const startDate = formatDate(item.startDate || item.dateFrom);
    const endDate = item.currentlyWorkingHere
      ? 'Present'
      : formatDate(item.endDate || item.dateTo);
    if (!showInterval) {
      return `${startDate} - ${endDate}`;
    }
    return `${startDate} - ${endDate} (${formatInterval(
      calculateMonths(
        item.startDate || item.dateFrom,
        item.endDate || item.dateTo,
        item.currentlyWorkingHere,
      ),
    )})`;
  };

  // prettier-ignore
  return /* html */ `
    <div class="codersrank-work-experience ${!logos ? 'codersrank-work-experience-no-logos' : ''} ${preloader ? 'codersrank-work-experience-loading' : ''}">
      ${preloader ? /* html */ `
      <div class="codersrank-work-experience-preloader"></div>
      ` : ''}
      <ul>
        ${workExperience.map((we) => /* html */`
        <li class="codersrank-work-experience-item-wrap">
          ${logos ? /* html */`
          <div class="codersrank-work-experience-logo">
            ${companyLogo(we.companyName, we.companyLogoUrl)}
          </div>
          ` : ''}
          <div class="codersrank-work-experience-content-wrap">
            <div class="codersrank-work-experience-company">
              ${ we.companyName }
            </div>
            <div class="codersrank-work-experience-date">
              ${ we.titles.length > 1 ? formatInterval(we.totalMonths) : dates(we.titles[0]) }
            </div>

            ${workExperienceLocation(we) ? /* html */`
              <div class="codersrank-work-experience-location">
                ${ workExperienceLocation(we) }
              </div>
            ` : ''}

            <div class="codersrank-work-experience-items">
              ${we.titles.map((title) => /* html */`
              <div
                class="codersrank-work-experience-item ${we.titles.length > 1 ? 'codersrank-work-experience-item-nested' : ''}"
              >
                <div class="codersrank-work-experience-title">
                  ${ title.title }
                </div>

                ${we.titles.length > 1 ? /* html */`
                <div class="codersrank-work-experience-date">
                  <div>${ dates(title) }</div>
                </div>
                ` : ''}

                ${title.description ? /* html */`
                <div class="codersrank-work-experience-description">${ title.description }</div>
                ` : ''}

                ${title.highlightedTechnologies || title.otherTechnologies ? /* html */`
                  <div class="codersrank-work-experience-tags">
                    ${title.highlightedTechnologies.map((tech) => /* html */`
                      <span class="codersrank-work-experience-tag"><span class="codersrank-work-experience-tag-star">★</span>${tech}</span>
                    `).join('')}

                    ${title.otherTechnologies.map((tech) => /* html */`
                      <span class="codersrank-work-experience-tag">${tech}</span>
                    `).join('')}
                  </div>
                ` : ''}

              </div>
              `).join('')}
            </div>
          </div>
        </li>
        `).join('')}
      </ul>
    </div>
  `;
};
