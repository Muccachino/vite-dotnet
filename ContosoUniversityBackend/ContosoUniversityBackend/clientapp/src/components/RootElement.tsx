import { Box, Grid } from "@mui/material";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

export default function RootElement() {
  return (
    <>
      <Header headerBackground="white" headerColor="black"/>
      <div id="container">
        <Grid container>
          <Grid item xs={12} sx={{ margin: "50px 20vw " }}>
            <Box
              sx={{
                backgroundColor: "rgb(230, 230, 230)",
                height: "200px",
                display: "flex",
                justifyContent: "left",
                paddingLeft: "5%",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <h1>Contoso University</h1>
            </Box>
          </Grid>
          <Grid
            container
            className="sample-articles"
            sx={{
              margin: "0 20vw ",
            }}
          >
            <Grid item xs={4} sx={{ padding: "10px" }}>
              <div>
                <h2>Welcome to Contoso University</h2>
                <p>
                  Contoso University is a sample application that demonstrates
                  how to use Entity Framework Core in an ASP.NET Core MVC web
                  application.
                </p>
              </div>
            </Grid>
            <Grid item xs={4} sx={{ padding: "10px" }}>
              <h2>Build it from scratch</h2>
              <p>
                You can build the application by following the steps in a series
                of tutorials.
              </p>
              <br />
              <p>
                <a href="https://docs.asp.net/en/latest/data/ef-mvc/intro.html">
                  See the tutorial &raquo;
                </a>
              </p>
            </Grid>
            <Grid item xs={4} sx={{ padding: "10px" }}>
              <h2>Download it</h2>
              <p>You can download the completed project from GitHub.</p>
              <br />
              <p>
                <a href="https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/data/ef-mvc/intro/samples/5cu-final">
                  See project source code &raquo;
                </a>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}
