  import { createContext } from 'react';
    
    // Membuat context baru. Nilai defaultnya null karena awalnya kita tidak tahu siapa user yang login.
    const AuthContext = createContext(null);
    
    export default AuthContext;
    