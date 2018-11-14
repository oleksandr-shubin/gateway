<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Users</h2>
        <div class="">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Alex</td>
                    <td>Test</td>
                    <td>alex.test@gmail.com</td>
                    <td>Apple</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-cog"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <a href="#" class="dropdown-item"><i class="far fa-edit"> Edit</i></a>
                                <a href="#" class="dropdown-item text-danger"><i class="far fa-trash-alt"> Delete</i></a>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <button class="btn btn-success">Add</button>
    </main>
</template>
