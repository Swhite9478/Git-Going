import React from 'react';
import {Layout} from '../components/layouts';

const styles = {
    display:'inline-block'
};

const home = (props) => {
    return (
      <div>
        <Layout>
          <h1>Home</h1>
          {JSON.stringify(props.auth)}
        </Layout>
      </div>
    );
}

export default home; 
