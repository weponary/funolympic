import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Table,
  TableCell,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "../assets/fixture.jpg";
import { GET_ALL_FIXTURE } from "../services/fixture/query";
import { useQuery } from "react-query";

const columns: GridColDef[] = [
  { field: "country1", headerName: "Country Name", width: 170 },
  { field: "time", headerName: "Time", width: 70 },
  { field: "country2", headerName: "Country Name", width: 170 },
];

const Fixture = () => {
  const { isLoading, data, error, refetch } = useQuery(
    ["getAllFixture"],
    GET_ALL_FIXTURE
  );
  console.log("Data.....", data);
  if (isLoading) {
    return <></>;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#f5f5f5"
      p={14}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        display="flex"
        justifyContent="center"
      >
        WEEKEND FIXTURE
      </Typography>
      <Box mt={4} display="flex" gap={10}>
        <Card
          sx={{
            maxWidth: 550,
            maxHeight: 700,
            bgcolor: "white",
            overflowY: "scroll",
          }}
        >
          <div>
            <CardContent>
              {(data?.data?.result ?? []).map((item: any, key: string) => {
                return (
                  <div key={key}>
                    <Typography
                      variant="h5"
                      color="secondary"
                      display={"flex"}
                      justifyContent="center"
                    >
                      {item.date}
                    </Typography>
                    <DataGrid
                      rows={item.result}
                      columns={columns}
                      disableColumnMenu
                      hideFooter
                      key={item.id}
                    />
                  </div>
                );
              })}
            </CardContent>

            {/* <CardContent>
              <Typography
                variant="h5"
                color="secondary"
                display={"flex"}
                justifyContent="center"
              >
                SUNDAY, JUNE 16TH
              </Typography>
              <DataGrid rows={Date2} columns={columns} />
            </CardContent> */}
          </div>
        </Card>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia component="img" height="700" image={Image} alt="picture" />
          {/* <CardMedia
            component="img"
            height="200"
            image={Picture}
            alt="picture"
          /> */}
        </Card>
      </Box>
    </Box>
  );
};

export default Fixture;
