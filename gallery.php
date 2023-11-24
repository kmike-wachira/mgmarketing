<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="Socail Media Marketing,Graphic Designs , Website Design & Development ,">
    <meta name="description" content="MG Marketing is a Digital Marketing Company that goes above and beyond to provide for our Client's needs through all Social Media platforms, making sure that they reach their target audience and get returns on their investments. We have a committed and diligent team that makes sure every area of your Social Media platform is well covered.">
    <meta property="og:image" content="https://mgmarketing.co.ke/img/mgposter.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1024">
    <meta property="og:image:height" content="1024">
    <title>Gallery | MG Marketing Kenya</title>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8H1W6YB6C0"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-8H1W6YB6C0');
    </script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8H1W6YB6C0"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-8H1W6YB6C0');
    </script>
    <!-- Mobile Specific Metas
    ================================================== -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">


    <!-- Favicon
    ================================================== -->
    <link rel="icon" type="image/png" href="https://mgmarketing.co.ke/img/logos/mgnew.png">


    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/animate/animate.min.css" rel="stylesheet">
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

    <!-- Customized Bootstrap Stylesheet -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/custom.css">
</head>

<body>
    <!-- Spinner Start -->
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100  loading=" lazy"vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->


    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <a href="index.php" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <img src="img/logos/mgnew.png" height="120" alt="MG Marketing" srcset="">
            <!-- <h2 class="m-0 text-primary"><i class="fa fa-book me-3"></i>MG Marketing</h2> -->
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto p-4 p-lg-0">
                <a href="index.php" class="nav-item nav-link">Home</a>
                <a href="about.php" class="nav-item nav-link ">About</a>
                <a href="services.php" class="nav-item nav-link">Services</a>
                <a href="team.php" class="nav-item nav-link">Team</a>
                <a href="gallery.php" class="nav-item nav-link active">Gallery</a>
                <a href="contact.php" class="nav-item nav-link">Contact</a>
                <a href="http://blog.mgmarketing.co.ke/" target="_blank" class="nav-item nav-link">Blog</a>
            </div>
            <!-- <a href="" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Join Now<i
                    class="fa fa-arrow-right ms-3"></i></a> -->
        </div>
    </nav>
    <!-- Navbar End -->


    <!-- Header Start -->
    <div class="container-fluid position-relative bg-primary py-5 mb-5 page-header" style=" background-image:url(img/photography.jpg)">
        <div class="position-absolute top-0 start-0 w-100 d-flex align-items-center h-100" style="background: rgba(24, 29, 56, .7);"></div>
        <div class="container position-relative py-5">

            <div class="row justify-content-center">
                <div class="col-lg-10 text-center">
                    <h1 class="display-3 text-white animated slideInDown">Gallery</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb justify-content-center">
                            <li class="breadcrumb-item"><a class="text-white" href="#">Home</a></li>
                            <li class="breadcrumb-item"><a class="text-white" href="#">Pages</a></li>
                            <li class="breadcrumb-item text-white active" aria-current="page">Gallery</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <!-- Header End -->
    <div class="container-fluid wow fadeInUp py-5" data-wow-delay="0.1s">
        <!-- <div class="Gallery"></div> -->
        <div class="container">
            <div class="row">
                <?php
                include 'admin/fileoperation.php';
                $images =  getImage();
                if (!empty($images)) :
                    foreach ($images as $key => $image) : ?>
                        <div class="col-md-3 col-lg-3 gallery-hover overflow-hidden g-1">
                            <img class=" img-fluid w-100" loading="lazy" src="img/gallery/<?php echo htmlspecialchars($image['imagename']) ?>" alt="<?php echo htmlspecialchars($image['caption']) ?>">
                        </div>
                    <?php
                    endforeach;
                else : ?>
                    <div class="col-md-12 col-lg-12 gallery-hover overflow-hidden g-1">
                        <h5>Nothing to show</h5>
                    </div>
                <?php endif ?>
            </div>
        </div>
    </div>

    <div class="container-xxl py-5 call-to-action d-flex align-items-center justify-content-center">
        <div class=" container row bg-light p-5 shadow rounded-1">
            <div class="col-md-8 col-lg-8">
                <h1 class=" text-warning">Are you impressed ?? Call Us now</h1>
            </div>
            <div class="col-md-3 col-lg-3 col-log-4 d-flex justify-content-center">
                <a class="btn btn-primary py-2 rounded-1 align-self-center" href="tel:+254 712 261633">Contact Us <i class="fas fa-phone shadow mx-3"></i></a>
            </div>
        </div>

    </div>

    <!-- testimonial end -->
    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-light footer pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-4 col-md-6">
                    <h4 class="text-white mb-3">Quick Link</h4>
                    <a class="btn btn-link" href="about.php">About Us</a>
                    <a class="btn btn-link" href="contact.php">Contact Us</a>
                    <a class="btn btn-link" href="team.php">Team</a>
                    <a class="btn btn-link" href="gallery.php">Gallery</a>
                    <a class="btn btn-link" href="services.php">Service</a>

                </div>
                <div class="col-lg-4 col-md-6">
                    <h4 class="text-white mb-3">Contact</h4>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Riva Business Centre Rm 515, Nakuru,Kenya</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+254 712 261633</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@mgmarketing.co.ke</p>
                    <div class="d-flex pt-2">
                        <!-- <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a> -->
                        <a class="btn btn-outline-light btn-social" target="_blank" href="https://www.facebook.com/mgmarketing101"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-outline-light btn-social" target="_blank" href="https://www.youtube.com/channel/UCUy790z2XmR8pYjFJgPK_vw"><i class="fab fa-youtube"></i></a> <a class="btn btn-outline-light btn-social" target="_blank" href="https://www.instagram.com/mgmarketing_101/"><i class="fab fa-instagram"></i></a>
                        <!-- <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a> -->
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <h4 class="text-white mb-3">Newsletter</h4>
                    <p>Get updated on our monthly Newsletter on how to grow a business</p>
                    <div class="position-relative mx-auto" style="max-width: 400px;">
                        <input class="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email">
                        <button type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright">
                <div class="row">
                    <div class="col-md-12 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a class="" href="#">MG Marketing</a>, All Right Reserved.
                    </div>
                    <!-- <div class="col-md-6 text-center text-md-end">
                     <div class="footer-menu">
                        <a href="">Home</a>
                        <a href="">Cookies</a>
                        <a href="">Help</a>
                        <a href="">FQAs</a>
                    </div> -->
                    <!-- </div>  -->
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->


    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>


    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>


    <!-- Template Javascript -->
    <script src="js/main.js"></script>
</body>

</html>