import { useNavigate } from 'react-router-dom';

export default function useRedirectPage() {
  const navigate = useNavigate();

  function setPage(url) {
    return navigate(url);
  }

  return [setPage];
}
