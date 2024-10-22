import axios from 'axios';

const REP_FORA = process.env.REP_FORA;

const useRepfora = {
  login: async (req, res) => {
    const { email, password, role } = req.body;
    try {
      const response = await axios.post(`${REP_FORA}/api/users/login`, { email, password, role });
      const token = response.data.token;
      console.log('Token recibido', token);
      res.json({ token });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  logininstructos: async (req, res) => {
    const { email, password } = req.body;
    try {
      const response = await axios.post(`${REP_FORA}/api/instructors/login`, { email, password });
      const token = response.data.token;
      console.log('Token recibido', token);
      res.json({ token });
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  listallinstructors: async (req, res) => {
    const token = req.headers['token'];
    console.log(token);
    try {
      const response = await axios.get(`${REP_FORA}/api/instructors`, { headers: { token: token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  listinstructorbyid: async (req, res) => {
    const token = req.headers['token'];
    console.log(token);
    const { id } = req.params;
    try {
      const response = await axios.get(`${REP_FORA}/api/instructors/${id}`, { headers: { token: token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  listallfiches: async (req, res) => {
    const token = req.headers['token'];
    console.log(token);
    try {
      const response = await axios.get(`${REP_FORA}/api/fiches`, { headers: { token: token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },

  listafichebyid: async (req, res) => {
    const token = req.headers['token'];
    console.log(token);
    const { id } = req.params;
    try {
      const response = await axios.get(`${REP_FORA}/api/fiches/${id}`, { headers: { token: token } });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  },
}

export default useRepfora


// login: async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//       const token = await Authetication.login(email, password, role);
//       res.json({ token });
//   } catch (error) {
//       res.status(401).json({
//           message: error.message,
//           status: 401
//       });
//   }
// },

// listallinstructors: async (req, res) => {
//   try {
//     const data = await Authetication.AutheticatedRequest('get', '/api/instructors');
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       status: 500
//     });
//   }
// },

// listinstructorbyid: async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await Authetication.AutheticatedRequest('get', `/api/instructors/${id}`);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       status: 500
//     });
//   }
// },
// listallfiches: async (req, res) => {
//   try {
//     const data = await Authetication.AutheticatedRequest('get', '/api/fiches');
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       status: 500
//     });
//   }
// },

// listafichebyid: async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await Authetication.AutheticatedRequest('get', `/api/fiches/${id}`);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       status: 500
//     });
//   }
// }
