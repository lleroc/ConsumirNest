$().ready(() => {
    cargaTabla();
});

var cargaTabla = () => {
    var html = '';
    $.get('http://localhost:3000/api/v1/usuarios', (datos) => {
        $.each(datos, (index, val) => {
            html += "<tr>" + "<td>" + (
                index + 1
            ) + "</td>" + "<td>" + val.nombre + "</td>" + "<td>" + val.usuario + "</td>" + "<td>" + val.email + "</td>" + "<td>" + "<button class='btn btn-success' onclick=editar('" + val._id + "')>Editar</button>" + "<button class='btn btn-danger'>Eliminar</button>" + "</td>" + "</tr>";
        });
        $('#cuerpo').html(html);
    });
}

var editar = (id) => {
    $.get('http://localhost:3000/api/v1/usuarios/' + id, (IUsuario) => {
        document.getElementById('nombre').value = IUsuario.nombre; // es con javascript
        $('#usuario').val(IUsuario.usuario); // con jquery
        $('#email').val(IUsuario.email);
        $('#password').val(IUsuario.password);
        $('#id').val(IUsuario._id);
        $('#ModalUsuario').modal('show');
    })
}

var nuevo = () => {
    $('#tituloModal').html('Nuevo Usuario');
}

var guardar = () => {
    var url = '';
    var tipo='';
    var nombre = document.getElementById('nombre').value; // es con javascript
    var usuario = $('#usuario').val(); // con jquery
    var email = $('#email').val();
    var passwrod = $('#password').val();
    var id = $('#id').val();
    if (id === '' || id === undefined) {
        var usuarioDTO = {
            nombre: nombre,
            usuario: usuario,
            email: email,
            password: passwrod
        }
        url = 'http://localhost:3000/api/v1/usuarios';
        tipo='POST';
    } else {
        var usuarioDTO = {
            id: id,
            nombre: nombre,
            usuario: usuario,
            email: email,
            password: passwrod
        }
        url = 'http://localhost:3000/api/v1/usuarios/' + id;
        tipo='PUT';
    }


    // $.post(usl,{data},()=>{mostrar lo que yo quiera})
    console.log(JSON.stringify(usuarioDTO))
    $.ajax({
        url: url,
        type: tipo,
        data: JSON.stringify(usuarioDTO),
        processData: false,
        contentType: false,
        cache: false,
        headers: {
            "Content-Type": "application/json"
        },
        success: (IUsuario) => {
            if (IUsuario) {
                cargaTabla();
                limpiaCajas();
            } else {
                alert('Error al guardar en la base de datos')
            }
        }
    });
}

var limpiaCajas = () => {
    document.getElementById('nombre').value = ''; // es con javascript
    $('#usuario').val(''); // con jquery
    $('#email').val('');
    $('#password').val('');
    $('#id').val('');
    $('#ModalUsuario').modal('hide');
}
