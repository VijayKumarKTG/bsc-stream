import React from 'react';

const Navbar = () => {
  return (
    <div>
       <nav class="navbar-border navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid nav-container">
            <a class="navbar-brand " href="index.html">
                <h2>BSC Stream</h2>
            </a>
            <button class="navbar-toggler mr-2" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-2">

                    <a class="nav-link px-2 px-md-3 px-lg-3" target="_blank"
                                  href=""><b>Dash Board</b></a>
                    <a class="nav-link px-2 px-md-3 px-lg-3" target="_blank" href=""><b>About</b></a>
                    <a class="nav-link px-2 px-md-3 px-lg-3" target="_blank"
                                  href=""><b>Sign In</b></a>


                </div>
            </div>
        </div>

    </nav>
    </div>
  );
};

export default Navbar;
