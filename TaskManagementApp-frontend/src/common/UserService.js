import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(userData){
        try{
            console.log('Making login request');  // Log to indicate the function call
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, userData);
            console.log('Response received:', response.data);
            return response.data;

        }catch(error){
            console.log('Error response:', error.response); 
            if (error.response) {
                // Server responded with a status other than 200 range
                return { message: error.response.data.message || 'An error occurred' };
              } else if (error.request) {
                // Request was made but no response received
                return { message: 'No response from server' };
              } else {
                // Something else happened in setting up the request
                return { message: 'Error: ' + error.message };
              }
        }
    }

    static async verify(userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/verify`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async resendCode(email){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/resend-code`, email)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async register(userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/signup`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUser(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/getAllUser`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAdminProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/profile`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAdminAndUserProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/profile`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/user/userProfile`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    

    static async getUserByPl(token,keyword){
        try{
            console.log(`Fetching users with keyword: ${keyword}`); 
            const response = await axios.get(`${UserService.BASE_URL}/admin/getByPL/${encodeURIComponent(keyword)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        } 
    }
    static async getUserByEmail(token,keyword){
        try{
            console.log(`Fetching users with keyword: ${keyword}`); 
            const response = await axios.get(`${UserService.BASE_URL}/admin/getByEmail/${encodeURIComponent(keyword)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        } 
    }
    static async updateUser(keyword,userData,token){
        try{
            console.log(`Fetching users with keyword: ${keyword}`); 
            const response = await axios.put(`${UserService.BASE_URL}/admin/updateUser/${encodeURIComponent(keyword)}`,userData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            console.log('Update response:', response.data);
            return response.data;
        }catch(err){
            throw err;
        } 
    }

    //task management
    static async addTask(token,formData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/admin/addTask`,formData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateTaskByAdmin(token,taskName,formData){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/updateTask/${encodeURIComponent(taskName)}`,formData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateTaskByUser(token,taskName,formData){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/user/updateTask/${encodeURIComponent(taskName)}`,formData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllTask(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/getAllTask`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getTaskByPl(token,keyword){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/getTaskByPl/${encodeURIComponent(keyword)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getTaskByTaskname(token,keyword){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/getByTaskName/${encodeURIComponent(keyword)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }



    /* // -> Comment functionality */

    //~ get comment by task name
    static async getAllCommntForTasks(token,taskName){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/getAllCommentByTask/${encodeURIComponent(taskName)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }
    
    // | add Comment
    static async addComment(token,formData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/adminuser/addComment`,formData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    // P update comment
    static async updateComment(token,email,formData){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/adminuser/updateComment/${encodeURIComponent(email)}`,formData,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    // V delete comment
    static async deleteComment(token ,email){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/adminuser/deleteComment/${encodeURIComponent(email)}`,{
                headers: {Authorization: `Bearer ${token}`}
            } )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_USER'
        
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;