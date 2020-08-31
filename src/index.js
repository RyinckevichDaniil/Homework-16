class ToDoList {
            notes;
            constructor(ApiUrl){
            this.ApiUrl = ApiUrl;
            }

        auth (userEmail){
            fetch (`${this.ApiUrl}/auth/login`, {
                method: "POST",
                headers: {
                "Content-Type":"application/json"
                }, body: JSON.stringify({
                value: userEmail
                })
            })
            .then(response => response.json())
            .then(({access_token}) => {
            this.token = access_token
            console.log("авторизован");
            this.getAllnotes()
            })
            .catch(({message}) => console.log(message)
            )
        }

        getAllnotes() {
            fetch (`${this.ApiUrl}/todo`,{
            method:"GET",
            headers: {
                Authorization: `Bearer ${this.token}`
            }
            })
            .then(response => response.json())
            .then(data => {
            this.notes=data;
            console.log(this.notes);
            
            })
            .catch(({message}) => console.log(message))
        }

        addNote (value, priority) {
        if(value.trim ()&& priority) {
            fetch (`${this.ApiUrl}/todo`, {
            method:"POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                value,
                priority
            })
            })  
            .then(response => response.json())   
            .then(note => this.notes.unshift(note))
            .catch(({message}) => console.log(message))
        }
        }

        removeNote (id) {
        fetch (`${this.ApiUrl}/todo/${id}`, {
            method: "DELETE",          
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        })
        .then(response => {
            if (response.status===200){
            const index = this.notes.findIndex (({_id}) => _id ===id)
            if (index !== -1) {
                this.notes.splice(index,1)
            } 
            }
        })
        .catch(({message}) => console.log(message))
        }
        
        getNote(id){
            fetch (`${this.ApiUrl}/todo/${id}`, {
            method: "GET",          
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
        .then(response => response.json())
        .then (console.log, "Note")
        .catch(({message}) => console.log(message))
        };

        toggleNoteComplete (id) {
            fetch (`${this.ApiUrl}/todo/${id}/toggle`, {
            method: "PUT",          
            headers: {
                Authorization: `Bearer ${this.token}`,
            }
        })
        .then(response => response.json())
        .then (note => {
            const index = this.notes.findIndex (({_id}) => _id ===id)
            if (index !== -1) {
                this.notes.splice(index,1)
        }
        })          
        .catch(({message}) => console.log(message))
        }
        
        updateNote (id, {value, priority}) {
        if(value.trim ()&& priority) {
            fetch (`${this.ApiUrl}/todo/${id}`, {
            method:"PUT",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                value,
                priority
            })
            })  
            .then(response => response.json())   
            .then (note => {
            const index = this.notes.findIndex (({_id}) => _id ===id)
            if (index !== -1) {
                this.notes.splice(index,1)
            }
            })
            .catch(({message}) => console.log(message))
        };
    };
};      

const myNote = new ToDoList('https://todo.hillel.it');
myNote.auth('Ryinckevich')

console.log(myNote);
