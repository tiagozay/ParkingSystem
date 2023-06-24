<?php
    namespace ParkSistem\Service;

    use DateInterval;
    use DateTime;

    abstract class DataService
    {
        public static function geraDataAtual()
        {
            return new DateTime();
        }

        public static function acrescenta1Mes(DateTime $data)
        {
            $novaData = clone $data;
            return $novaData->add(new DateInterval('P1M'));
        }
    }
?>