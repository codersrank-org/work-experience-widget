import { codersRankLogo } from './codersrank-logo';
import { companyLogo } from './company-logo';
import { differenceInMonths } from './difference-in-months';
import { sanitizeDescription } from './sanitize-description';

export const render = ({
  data: workExperience,
  logos,
  grid,
  preloader,
  branding,
} = {}) => {
  const workExperienceLocation = (we) => {
    const location = we.titles[0].location;
    if (location === 'Remote, Earth' || we.is_remote) return 'Remote';
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

  const calculateMonths = (startDate, endDate, is_current) => {
    const end = is_current ? new Date() : new Date(endDate);
    return differenceInMonths(new Date(startDate), end);
  };

  const dates = (item, showInterval = true) => {
    const startDate = formatDate(item.start_date || item.date_from);
    const endDate = item.is_current
      ? 'Present'
      : formatDate(item.end_date || item.date_to);
    if (!showInterval) {
      return `${startDate} - ${endDate}`;
    }
    return `${startDate} - ${endDate} (${formatInterval(
      calculateMonths(
        item.start_date || item.date_from,
        item.end_date || item.date_to,
        item.is_current,
      ),
    )})`;
  };

  // prettier-ignore
  return /* html */ `
    <div class="codersrank-work-experience ${grid ? 'codersrank-work-experience-grid' : ''} ${!logos ? 'codersrank-work-experience-no-logos' : ''} ${preloader ? 'codersrank-work-experience-loading' : ''}">
      ${preloader ? /* html */ `
      <div class="codersrank-work-experience-preloader"></div>
      ` : ''}
      <ul>
        ${workExperience.map((we) => /* html */`
        <li class="codersrank-work-experience-item">
          ${logos ? /* html */`
          <div class="codersrank-work-experience-logo">
            ${companyLogo(we.company, we.company_logo)}
          </div>
          ` : ''}
          <div class="codersrank-work-experience-content-wrap">
            <div class="codersrank-work-experience-company">
              ${ we.company }
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
                class="codersrank-work-experience-position ${we.titles.length > 1 ? 'codersrank-work-experience-position-nested' : ''}"
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
                <div class="codersrank-work-experience-description">${ sanitizeDescription(title.description) }</div>
                ` : ''}

                ${title.highlighted_technologies || title.other_technologies ? /* html */`
                  <div class="codersrank-work-experience-tags">
                    ${title.highlighted_technologies.map((tech) => /* html */`
                      <span class="codersrank-work-experience-tag"><span class="codersrank-work-experience-tag-star">★</span>${tech}</span>
                    `).join('')}

                    ${title.other_technologies.map((tech) => /* html */`
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
      ${branding ? /* html */`
      <div class="codersrank-work-experience-branding">
        <a href="https://codersrank.io" target="_blank" rel="noopener noreferrer">
          <span>Powered by </span>
          ${codersRankLogo}
        </a>
      </div>
      ` : ''}
    </div>
  `;
};
