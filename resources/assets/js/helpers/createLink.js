export default function(data) {
  const { title, category, idarticle } = data;
  const link = `/app/news/${category.replace(/ /g,'-')}/${idarticle}/${title.replace(/ /g,'-').toLowerCase()}`;

  return link;
}
