export const sanitizeDescription = (html = '') => {
  return (html || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
};
