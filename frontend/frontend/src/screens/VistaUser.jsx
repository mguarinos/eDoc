import React from "react";

export default function VistaUser(props) {
        return (
            <div id="header1" class="header">
                <div class="container">
                    <div class="header-content row">
                        <div id="owl-demo" class="owl-carousel header1">
                            <div>
                                <div class="col-xs-12 col-sm-6 col-md-6 header-text">
                                    <h2 class="wow bounceIn animated" data-wow-delay=".40s">BIENVENIDO <span>A</span> LA<br />APLICACIÓN DE eDOC</h2>
                                    <h3 class="wow bounceIn animated" data-wow-delay=".50s">REALIZA TUS EVALUACIONES </h3>
                                    <p class="wow bounceIn animated" data-wow-delay=".60s">Ten en cuenta que todas las evaluaciones son anónimas y cada persona solo puede evaluar cada asignatura una vez</p>
                                    <p>
                                        <div class="btn btn-primary btn-lg btn-ornge wow bounceIn animated" data-wow-delay="1s"><i class="hbtn"></i> <span><button onClick={props.toggleDrawer('left', true)}>Evaluar asignatura</button></span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}