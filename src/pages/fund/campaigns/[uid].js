import HTMLHead from "../../../common/components/HTMLHead";
import { styles } from "../../../styles/fundCampaignIndex.module.css";
import RouteComponents from "../../../common/components/UI/AllCampaigns/campaign/RouteComponents";
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/all-campaigns");
  const data = await res.json();

  const paths = data.map((campaign) => {
    return {
      params: {
        uid: campaign.uid.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const uid = context.params.uid;
  const res = await fetch("http://localhost:3000/api/all-campaigns/" + uid);
  const data = await res.json();
  return {
    props: { campaign: data },
  };
};

const DonatePage = ({ campaign }) => {
  return (
    <>
      <HTMLHead title={campaign.title} />
      <RouteComponents
        title={campaign.title}
		description={campaign.description}
        coverImage={campaign.coverImage}
		deadlineInt={campaign.deadlineInt}
        images={campaign.images}
        uid={campaign.uid}
        goalEthAmt={campaign.goalEthAmt}
        currEthAmount={campaign.currEthAmount}
        percentageCompleted={campaign.percentageCompleted}
        link={campaign.link}
		projectAddress={campaign.projectAddress}
      />
    </>
  );
};

export default DonatePage;
