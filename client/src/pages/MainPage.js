import React from 'react';
import './MainPage.css';
import {withRouter} from 'react-router-dom';

import Button from 'components/Button.js';

const MainPage = ({history}) => (
  <div className="MainPage">
    <div className="MainPage_hero-container">
      <div className="MainPage_container">
        <div class="heroText">
          <h1 className="MainPage_hero">NetTest</h1>
          <Button lg light onClick={() => history.push('/test')}>
            See My Speeds
          </Button>
          <div class="scroll-down"></div>
        </div>
      </div>
    </div>
    <div className="MainPage_container">
      <h2>What is Net Neutrality?</h2>

      <p>
        Net Neutrality, “the idea, principle, or requirement that Internet service providers should
        or must treat all Internet data as the same regardless of its kind, source, or destination”
        (Merriam-Webster), is under attack.
      </p>
      <p>
        The FCC, headed by Ajit Pai, is holding a vote Thursday, December 14th on whether or not to
        repeal many of the FCC’s current Net Neutrality policies. Most important of which is the
        internet’s protection under Title II regulation.
      </p>
      <p>
        Ajit Pai, along with proponents of the Title II repeal, argue that this protection limits
        infrastructure investment, citing a “1 billion dollar drop in infrastructure investment”.
      </p>
      <p>
        With Net Neutrality, all traffic has equal treatment, regardless of source or destination.
        All traffic is in “the same lane”.
      </p>
      <p>
        Without Net Neutrality, ISPs can give preferential treatment towards certain traffic. For
        example, consider the popular streaming service, Netflix. Currently, two users who access
        Netflix do so with equal treatment with their respective ISP’s. However, if the vote on
        Thursday goes according to Ajit Pai, Verizon could throttle your connection to Netflix
        because they have been paid to favor Hulu.
      </p>
      <p>
        Imagine if you had to pay $20 extra to have “Youtube Priority Access”. And that without it, you are
        throttled into watching videos at a meager 240p.
      </p>

      <h2>What is NetTest?</h2>
      <p>
        NetTest is a distributed latency testing service. We ping some of the most popular websites on
        the internet and compare your results to a global average.
      </p>
      <p>
        This score will give you a sense of where your internet service provider is throttling your connection. Plus,
        if you don't like what you see, we will give you the information you need to contact your representatives in
        congress so you can bring this to their attention.
      </p>
    </div>
  </div>
);

export default withRouter(MainPage);
