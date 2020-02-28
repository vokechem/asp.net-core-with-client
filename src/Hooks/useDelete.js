import swal from 'sweetalert';
import { useState } from 'react';

const useDelete = (url) => {
    const [loading, setLoading] = useState(true)
    const HandleDelete = (e) => {       
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this record?",
            icon: "warning",
            dangerMode: false
          }).then(willDelete => {
            if (willDelete) {
                fetch(url + e, {
                    method: "Delete",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdGV2ZSIsImp0aSI6ImIyNmJjZDdhLWI2M2MtNDhjZC1iZjE2LWM2NjFjNzVhN2QwYyIsImV4cCI6MTU4MjU0NjE2NSwiaXNzIjoiaHR0cDovL2NpdGltYXguY28ua2UiLCJhdWQiOiJodHRwOi8vY2l0aW1heC5jby5rZSJ9.DCGQKiV_BESHJDAbJsNckFpwfD9K1mOVYHVwwR4WyBE" //localStorage.getItem("token")
                    }
                })
                .then(response =>
                    response.json().then(data => {
                        if (data.errors == null) {
                            setLoading(false)
                            swal("Deleted!", "Record has been deleted!", "success");
                             window.location.reload(); 
                        } else {
                            setLoading(false)
                            swal("error!", data.errors.Name[0], "error");
                        }
                    })
                )
                .catch(err => {
                    setLoading(false)
                    swal("Oops!", "Sorry an error occured.Try again", "error");
                });
            }});
      
    }
    const HandleEditData=(data)=>{
        fetch(url +data.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
          })
            .then(response =>
              response.json().then(data => {
               
                if (data.errors==null) {
                  swal("Saved!", "Record has been edited!", "success");
                  window.location.reload(); 
                } else {
                  swal("Saved!", data.errors.Name[0], "error");
                }
              })
            )
            .catch(err => {
              swal("Oops!", "Failed", "error");
            });
    }
    return { HandleDelete,HandleEditData }
}

export default useDelete;