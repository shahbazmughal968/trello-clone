import { Box, Card, Grid, IconButton, Stack, Typography } from "@mui/material";
import { data as initialData } from "./boards.data";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { AddNewBoardModal } from "./add-new-board-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function BoardsSection(): JSX.Element {
  const [data, setData] = useState(initialData);
  const router = useRouter();

  useEffect(() => {
    setData(initialData);
  }, []);
  return (
    <Grid container spacing={2}>
      {data.map((items) => (
        <Grid item xs={2} key={items?.id}>
          <Card
            sx={{
              pt: 1,
              boxShadow: 10,
              borderRadius: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(`/board?name=${items.name}&id=${items?.id}`);
            }}
          >
            <Stack px={1} pb={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontFamily="initial">{items?.name}</Typography>
                <IconButton sx={{ p: 0 }}>
                  <MoreVertOutlinedIcon />
                </IconButton>
              </Stack>
              <Typography variant="subtitle2" fontFamily="initial">
                {items?.shortDescription}
              </Typography>
            </Stack>
            <Box sx={{ p: 0.5, backgroundColor: "#1976D2" }}></Box>
          </Card>
        </Grid>
      ))}
      <Grid item xs={1} my="auto">
        <AddNewBoardModal setData={setData} data={data} />
      </Grid>
    </Grid>
  );
}
