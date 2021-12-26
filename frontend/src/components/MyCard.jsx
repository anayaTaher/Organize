import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";


const cardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "30px",
  position: "relative",
  borderRadius: "10px",
};

export default function MyCard({ img, title, description }) {
  return (
    <>
      <Card style={cardStyle}>
        <CardMedia
          component="img"
          image={img}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            style={{ textAlign: "center", color: "#708090" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton> <FacebookIcon style={{color: "#1778F2"}}/> </IconButton>
                <IconButton> <TwitterIcon style={{color: "#1DA1F2"}}/> </IconButton>
                <IconButton> <LinkedInIcon style={{color: "#0072b1"}}/> </IconButton> */}
        </CardActions>
      </Card>
    </>
  );
}
