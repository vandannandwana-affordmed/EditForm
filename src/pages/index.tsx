import { Paper } from "@mui/material";
import EditForm from "../components/EditForm";

export default function Home() {
  return (
    <>
      <main>
        <Paper
          className="createAccountForm"
          elevation={12}
          sx={{ width: "100%", padding: 4 }}
        >
          <EditForm />
        </Paper>
      </main>
    </>
  );
}
