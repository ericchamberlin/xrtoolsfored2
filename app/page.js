import { getAllContent, getMostCommonTags } from '../lib/airtable';
import Layout from './components/Layout';
import HomeContent from '../components/HomeContent';

export default async function Home() {
  const allContent = await getAllContent();
  const popularTags = await getMostCommonTags(15);
  
  return (
    <Layout>
      <HomeContent initialContent={allContent} popularTags={popularTags} />
    </Layout>
  );
}