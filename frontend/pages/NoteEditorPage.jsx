import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../src/lib/axios';
import toast from 'react-hot-toast';

const NoteEditorPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = () => {
      api
        .get(`/notes/${id}`)
        .then((res) => {
          setNote(res.data);
        })
        .catch((error) => {
          console.log('Error in fetching note', error);
          toast.error('Failed to fetch the note');
        })
        .finally(setLoading(false));
    };

    fetchNote();
  }, [id]);

  return <div>NoteEditorPage</div>;
};

export default NoteEditorPage;
