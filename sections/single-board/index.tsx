import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { AddStackModal } from "./add-stack";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

export function SingleBoardSection(): JSX.Element {
  const [data, setData] = useState([
    {
      id: "1",
      stackName: "To Do",
      tasks: [
        { id: "1.1", taskName: "Jira Ticket 1.1" },
        { id: "1.2", taskName: "Jira Ticket 1.2" },
      ],
    },
    {
      id: "2",
      stackName: "In-Progress",
      tasks: [{ id: "2.1", taskName: "Jira Ticket 2.1" }],
    },
  ]);

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const handleDragEnd = (result: any) => {
    console.log("Drag result:", result);
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newData = [...data];
    const sourceColumnIndex = newData.findIndex(
      (column) => column.id === source.droppableId
    );
    const destinationColumnIndex = newData.findIndex(
      (column) => column.id === destination.droppableId
    );

    const sourceColumn = newData[sourceColumnIndex];
    const destinationColumn = newData[destinationColumnIndex];

    const [removedTask] = sourceColumn.tasks.splice(source.index, 1);
    destinationColumn.tasks.splice(destination.index, 0, removedTask);

    newData[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: [...sourceColumn.tasks],
    };
    newData[destinationColumnIndex] = {
      ...destinationColumn,
      tasks: [...destinationColumn.tasks],
    };

    setData(newData);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" py={1} spacing={2}>
        <Typography variant="h5" fontFamily="initial">
          {name}
        </Typography>
        <AddStackModal data={data} setData={setData} />
      </Stack>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack direction="row" gap={2}>
          {data.map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <Card
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    width: 400,
                    boxShadow: 10,
                    borderRadius: 2,
                  }}
                >
                  <Stack
                  direction="row"
                    sx={{ backgroundColor: "#1976D2", p: 1 }}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6" fontFamily="initial" color="white">
                      {column.stackName}
                    </Typography>
                    <IconButton sx={{ p: 0,color:"white" }}>
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </Stack>
                  <Stack sx={{ px: 1, py: 2 }}>
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              display: "flex",
                              boxShadow: 15,
                              mb: 1,
                            }}
                          >
                            <Box
                              sx={{ p: 0.5, backgroundColor: "#1976D2" }}
                            ></Box>

                            <Typography
                              variant="body2"
                              color="gray"
                              sx={{ p: 1, fontFamily: "initial" }}
                            >
                              {task.taskName}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Card>
              )}
            </Droppable>
          ))}
        </Stack>
      </DragDropContext>
    </>
  );
}
