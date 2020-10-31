import Navbar from "../components/navbar";
import Head from "next/head";
import { Header, Divider, Grid, Embed } from "semantic-ui-react";
import styles from "../styles/About.module.css";

export default function About(params) {
  return (
    <div>
      <Head>
        <title>About us</title>
      </Head>
      <Navbar />
      <Header as="h3" textAlign="center">
        LET ME TELL MORE ABOUT
      </Header>
      <Header as="h2" textAlign="center">
        KALINGA NAGAR PARIBESHA SURAKSHA SAMITI
      </Header>

      <Grid centered columns={1} id={styles.gridMain}>
        <Grid.Column>
          <Divider id={styles.Divider} clearing horizontal>
            OUR MISSION
          </Divider>
        </Grid.Column>

        <Grid.Column>
          <Header sub textAlign="center">
            The Society shall be a voluntary and non-profit making Organization
          </Header>
        </Grid.Column>

        <Grid.Column textAlign="justified" id={styles.gridForMission}>
          <Header sub textAlign="center">
            The objectives are as follows:
          </Header>
          <ol className={styles.listMissions}>
            <li>
              To organize young People to work for the upliftment of the poor
              and the neglected in the society.
            </li>
            <br />
            <li>
              To work for the development of Women, Children and Distressed
              people.
            </li>
            <br />
            <li>
              To organize young people to work for National Unity and National
              Integrity.
            </li>
            <br />
            <li>
              To Develop literary skill in the youths and children through
              Libraries, Pathachakras, Seminars, Workshops and Literary
              competitions.
            </li>
            <br />
            <li>
              To publish magazines journals, periodicals etc. to encourage
              creative literature in all within Jajpur District/ State of
              Orissa.
            </li>
            <br />
            <li>
              To work for promotion of cottage Industries, Poultry Farms Diary
              Farms, Fisheries, Handicrafts etc.{" "}
            </li>
            <br />
            <li>To fight exploitation, corruption & poverty.</li>
            <br />
            <li>
              To organise cultural programmes/ competitions to encourage
              cultural potentiality of the rural talents.
            </li>
            <br />
            <li>
              To organise workshops, seminary etc on different socio-economic
              topics of national importance.
            </li>
            <br />
            <li>
              To take up Plantation, Afforestation programmes in suitable areas.
            </li>
            <br />
            <li>
              To run N F.E Adult Education Centers, Orphan Age homes, Old Age
              Homes. Day Care Centres, Maternity Homes etc.
            </li>
            <br />
            <li>
              To take up rescue and relief operations during the times of
              natural catarnitids like flood, draught cyclone, earth quake, etc.
            </li>
            <br />
            <li>To act as a bridge between the govt. and people in need.</li>
            <br />
            <li>
              To receive funds from Govt. non govt. Agencies Ministries Gerard
              people, Foreign agencies, institutions etc. for the welfare of the
              people and society as a whole.
            </li>
            <br />
            <li>
              To take up and implement all such programmes as and when decided
              by the Executive Body of the Organisation.
            </li>
            <br />
            <li>
              To work for Environmental Protection, Forestation, Plantation,
              Waste Land Management.
            </li>
            <br />
            <li>
              To pier-note and protect natural herbs and plants by cultivation,
              preservati'on, storage , processing , demonstration, creating
              botanical garden and providing necessary training.
            </li>
            <br />
            <li>
              To promote traditional therapies like Yoga, Naturopathy,
              Meditation, Aacurpressure, Ayurveda, Homeopathy, Reiki, etc.
            </li>
            <br />
            <li>
              To work for the welfare of Agricultural workers, Farmers,
              Unorganized Labours, Industrial Labours and Migrated Labours.
            </li>
            <br />
            <li>
              To work against the exploitation of Animals & Birds and make
              sincere efforts to protect them.
            </li>
            <br />
            <li>
              To celebrate annual day of the trust every year as cultural and
              social event.
            </li>
          </ol>
        </Grid.Column>

        
      </Grid>
    </div>
  );
}
