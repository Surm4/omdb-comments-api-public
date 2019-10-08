-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql7.freesqldatabase.com
-- Czas generowania: 08 Paź 2019, 06:40
-- Wersja serwera: 5.5.58-0ubuntu0.14.04.1
-- Wersja PHP: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `COMMENTS`
--

CREATE TABLE `COMMENTS` (
  `ID` int(11) NOT NULL,
  `MovieImdbID` varchar(255) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `Rating` varchar(5) NOT NULL DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `MOVIES`
--

CREATE TABLE `MOVIES` (
  `ID` int(11) NOT NULL,
  `Actors` varchar(1024) DEFAULT NULL,
  `Awards` varchar(1024) DEFAULT NULL,
  `BoxOffice` varchar(1024) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `DVD` varchar(255) DEFAULT NULL,
  `Director` varchar(255) DEFAULT NULL,
  `Genre` varchar(255) DEFAULT NULL,
  `Language` varchar(255) DEFAULT NULL,
  `Metascore` varchar(255) DEFAULT NULL,
  `Plot` longtext,
  `Poster` varchar(255) DEFAULT NULL,
  `Production` varchar(255) DEFAULT NULL,
  `Rated` varchar(255) DEFAULT NULL,
  `Released` varchar(255) DEFAULT NULL,
  `Response` varchar(255) NOT NULL,
  `Runtime` varchar(255) DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Website` varchar(255) DEFAULT NULL,
  `Writer` varchar(255) DEFAULT NULL,
  `Year` varchar(4) DEFAULT NULL,
  `imdbID` varchar(255) NOT NULL,
  `imdbRating` varchar(255) DEFAULT NULL,
  `imdbVotes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



--
-- Struktura tabeli dla tabeli `RATINGS`
--

CREATE TABLE `RATINGS` (
  `ID` int(11) NOT NULL,
  `Value` varchar(255) DEFAULT NULL,
  `Source` varchar(255) DEFAULT NULL,
  `MovieImdbID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Indexes for table `COMMENTS`
--
ALTER TABLE `COMMENTS`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `MOVIES`
--
ALTER TABLE `MOVIES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `imdbID` (`imdbID`);

--
-- Indexes for table `RATINGS`
--
ALTER TABLE `RATINGS`
  ADD PRIMARY KEY (`ID`);

