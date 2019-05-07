<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">HR Panel</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
<?php
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
    ?>
            <li class="nav-item active">
                <a class="nav-link" href="index.php">Login <span class="sr-only">(actif)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="home.php">Panel</a>
            </li>
        </ul>
    </div>
</nav>
<?php
} else if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
?>
            <li class="nav-item <?= $_SESSION['activePage'] === 'home' ? 'active' : '' ?>">
                <a class="nav-link" href="home.php">Panel</a>
            </li>
            <li class="nav-item <?= $_SESSION['activePage'] === 'users' ? 'active' : '' ?>">
                <a class="nav-link" href="users.php">Utilisateurs</a>
            </li>
            <li class="nav-item <?= $_SESSION['activePage'] === 'employees' ? 'active' : '' ?>">
                <a class="nav-link" href="employees.php">Employés</a>
            </li>
            <li class="nav-item <?= $_SESSION['activePage'] === 'departments' ? 'active' : '' ?>">
                <a class="nav-link" href="departments.php">Départements</a>
            </li>
        </ul>
    </div>
    <a href="logout.php"><button class="btn btn-outline-secondary mr-sm-2" type="button">Logout</button></a>
</nav>
    <?php
}