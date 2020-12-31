import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ComboBox from './box';

export default function SimpleContainer(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{backgroundColor: "#fff"}}>
        <div class="lang-box">
          <ComboBox />
        </div>
        <Typography component="div" style={{ backgroundColor: '#fff', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}
