import Head from 'next/head';
function PageTitle({title}) {
  return (
    <>
      <Head>
        <html lang='en' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
      </Head>
    </>
  );
}
export default PageTitle;
