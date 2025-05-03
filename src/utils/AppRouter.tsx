import Layout from '@/layout/Layout';
import Landing from '@/pages/Landing';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: '',
    children: [
      {
        // 로그인
        path: '/login',
        element: '',
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
        element: '',
        errorElement: '',
      },
    ],
  },
]);

export default router;
