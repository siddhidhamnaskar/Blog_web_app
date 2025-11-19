import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useEffect ,useState} from 'react';
import { base_url } from '../Sevices/API';
import { set } from 'mongoose';
import { store } from '../Redux/store';
import { getData } from '../Redux/actions';
import { IconButton, InputAdornment, CircularProgress, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

export default function Playground() {
  const [value, setValue] = React.useState();
  const [selectedTeam, setSelectedTeam] = useState({Author:{Name:""}});
     const [data,setData]=React.useState([]);
     const [allAuthors, setAllAuthors] = useState([]);
     const [loading, setLoading] = useState(false);
     const [fetchingAuthors, setFetchingAuthors] = useState(true);


     store.subscribe(()=>{
      // console.log(store.getState());
      setData(store.getState().data)

    })

    // Fetch all authors for autocomplete
    useEffect(() => {
      setFetchingAuthors(true);
      fetch(`${base_url}/blogs`)
        .then((res) => res.json())
        .then((json) => {
          const uniqueAuthors = [...new Set(json.map(post => post.Author.Name))];
          setAllAuthors(uniqueAuthors.map(name => ({ Author: { Name: name } })));
          setFetchingAuthors(false);
        })
        .catch((err) => {
          console.log("Error fetching authors");
          setFetchingAuthors(false);
        });
    }, []);

    useEffect(()=>{

      console.log(selectedTeam.Author.Name);

        if (selectedTeam.Author.Name) {
          setLoading(true);
          fetch(`${base_url}/names/?Author=${selectedTeam.Author.Name}`)
            .then((res)=>{
                res.json().then((json)=>{
                     console.log(json)
                      // setBlogData(json);
                      store.dispatch(getData(json));
                      setLoading(false);
                    //  filterData(json);
                })
            })
            .catch((err)=>{
                console.log("Error");
                setLoading(false);
            })
        } else {
          // If no author selected, show all blogs
          fetch(`${base_url}/blogs`)
            .then((res) => res.json())
            .then((json) => {
              store.dispatch(getData(json));
            })
            .catch((err) => console.log("Error"));
        }



    },[selectedTeam])

    const handleClear = () => {
      setSelectedTeam({Author:{Name:""}});
      // Reset to all blogs
      fetch(`${base_url}/blogs`)
        .then((res) => res.json())
        .then((json) => {
          store.dispatch(getData(json));
        })
        .catch((err) => console.log("Error"));
    };

  const defaultProps = {
    options: allAuthors,
    getOptionLabel: (option) => option.Author.Name,
  };



  return (
    <Stack spacing={1} sx={{ width: { xs: 200, sm: 250, md: 300 } }}>
      <Autocomplete
        id="author-search"
        options={allAuthors}
        renderInput={params => (
          <TextField
            {...params}

            variant="outlined"
            placeholder="Search by Author"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {loading && <CircularProgress size={20} />}
                  {selectedTeam.Author.Name && !loading && (
                    <IconButton onClick={handleClear} size="small">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                height: { xs: 40, sm: 44, md: 48 },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                }
              }
            }}
          />
        )}
        getOptionLabel={option => option.Author.Name}
        style={{ width: '100%' }}
        value={selectedTeam}
        onChange={(_event, newTeam) => {
          setSelectedTeam(newTeam || {Author:{Name:""}});
        }}
        loading={fetchingAuthors}
        noOptionsText="No authors found"
        clearOnEscape
        filterOptions={(options, { inputValue }) =>
          options.filter(option =>
            option.Author.Name.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
      />
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Stack>
  );
}
