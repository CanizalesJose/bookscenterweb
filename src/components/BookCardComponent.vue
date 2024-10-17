<template>
    <div class="col s3">
        <div class="card hoverable">
            <div class="card-image">
                <img :src="cover">
                <span class="card-title black-text">{{ title }}</span>
            </div>
            <div class="card-content">
                <p class="truncate-multiline">
                    {{ summary }}
                </p>
            </div>
        </div>
    </div>

    <!-- Modal Structure -->
    <div id="addBookModal" class="modal">
        <div class="modal-content">
            <h4>¿Agregar libro al pedido?</h4>
            <p>
                Al pedir prestado un libro se tiene una semana para devolverlo. En caso contrario se le penalizará con una multa.
                <br><br>
                <b>Sinopsis:</b>
                <br>
                {{ summary }}
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Categoría</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img :src="cover" class="listCover"></td>
                        <td>{{ title }}</td>
                        <td>{{ category }}</td>
                        <td>{{ author }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a class="modal-close waves-effect waves-green btn-flat">Aceptar</a>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps(['bookId', 'catalogId', 'cover', 'title', 'category', 'author', 'summary']);

</script>

<style scoped>
.responsive-table{
    overflow-x: auto;
}
table th, table td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
}
.modalContainer{
    padding-left: 5%;
    padding-right: 5%;
}
.listCover {
    width: 100px;
}
.card-image{
    width: 100%;
    min-width: 200px;
}
.card-content {
    height: 100px;
}
.card{
    min-height: 400px;
    min-width: 200px;
}
.truncate-multiline {
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100%;
}
</style>