import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getQuestions as fetchQuestions,
  addNewQuestion,
  removeQuestion,
  updateQuestion,
} from '../api/firebase';

export default function useQuestion() {
  const queryClient = useQueryClient();
  const questionsQuery = useQuery(['questions'], fetchQuestions, { staleTime: 1000 * 60 });

  const addQuestion = useMutation(({ text, url, user }) => addNewQuestion(text, url, user), {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  const updateItem = useMutation(({ text, url, user }) => updateQuestion(text, url, user), {
    onSuccess: () => queryClient.invalidateQueries(['questions']),
  });

  const removeItem = useMutation((id) => removeQuestion(id), {
    onSuccess: (id) => {
      queryClient.invalidateQueries(['questions', id]);
    },
  });

  return { questionsQuery, addQuestion, removeItem, updateItem };
}
