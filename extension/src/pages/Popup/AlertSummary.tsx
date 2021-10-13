import { Card } from '@mui/material';
import React from 'react';
import Alert from '../../Alert';

const AlertSummary = (props: any) => {
  let spot_alert: Alert = props.spot_alert;
  let alert_highlighter 

  const render_field = (alert: Alert, field_name: string) => {

    if (alert.alert_fields.includes(field_name)) {
      return <div className="matched_field">{alert[field_name]}</div>
    } else {
      return <div>{alert[field_name]}</div>
    }
  }

  const alert_click = () => {

  }

  return (
    <Card className="Alert" onClick={alert_click}>
      {render_field(spot_alert, "callsign")}
      {render_field(spot_alert, "unit")}
      {render_field(spot_alert, "frequency")}
      {render_field(spot_alert, "location")}
    </Card>
  );
};

export default AlertSummary;