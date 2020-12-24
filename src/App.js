import { useState } from "react";
import { Button } from 'semantic-ui-react'

import EditEntryModal from './components/EditEntryModal/EditEntryModal'
import { STATUS } from './constants'
import "./App.scss";

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      <Button circular onClick={() => setOpen(true)}>Add New Entry</Button>
      <EditEntryModal
        open={open}
        onClose={() => setOpen(false)}
        heading='New Entry'
        entryId={'1234'} // TODO: fetch existing from db, or set to null if new
        initialValues={{
          status: STATUS.APPLIED,
          notes: 'helloo',
        }}
        onSave={values => console.log(values)}
      />
    </div>
  );
}

export default App;
