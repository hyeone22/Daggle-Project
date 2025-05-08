import BoardDetail from '@/pages/BoardDetail';
import Layout from '@/layout/Layout';
import Landing from '@/pages/Landing';
import Write from '@/pages/Write';
import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: '',
    children: [
      {
        // 로그인
        path: '/login',
        element: <Login />,
        errorElement: '',
      },
      {
        // 메인페이지(커뮤니티 리스트)
        path: '/',
        element: <Landing />,
        errorElement: '',
      },
      {
        // 커뮤니티 상세페이지(여기는 api의 id 값으로 설정될 것 같은데 주소를 어떻게 설정해야할까?)
        path: '/:id',
        element: <BoardDetail />,
        errorElement: '',
      },
      {
        // 글 작성 페이지
        path: '/write',
        element: <Write />,
        errorElement: '',
      },
      {
        // 글 수정 페이지
        path: '/write/:id',
        element: <Write />,
        errorElement: '',
      },
    ],
  },
]);

export default router;
