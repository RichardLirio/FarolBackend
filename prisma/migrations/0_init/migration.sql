-- CreateTable
CREATE TABLE `custos` (
    `id_custo` INTEGER NOT NULL AUTO_INCREMENT,
    `id_veiculo` INTEGER NULL,
    `id_produto` INTEGER NULL,
    `descricao` TEXT NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `valor_total` DECIMAL(10, 2) NOT NULL,
    `data_custo` DATE NOT NULL,

    INDEX `id_produto`(`id_produto`),
    INDEX `id_veiculo`(`id_veiculo`),
    PRIMARY KEY (`id_custo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pessoas` (
    `id_pessoa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(20) NULL,
    `cnpj_cpf` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NULL,
    `inscricao_estadual` VARCHAR(50) NULL,
    `tipo` ENUM('Pessoa Fisica', 'Pessoa Juridica') NOT NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `bairro` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `cnpj_cpf_UNIQUE`(`cnpj_cpf`),
    PRIMARY KEY (`id_pessoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `unidade` VARCHAR(20) NOT NULL,
    `quantidade_estoque` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipodocumento` (
    `id_tipo_doc` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_tipo_doc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacoes` (
    `id_transacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_veiculo` INTEGER NULL,
    `id_produto` INTEGER NULL,
    `id_pessoa` INTEGER NOT NULL,
    `tipo` ENUM('Compra', 'Venda') NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `data_transacao` DATE NOT NULL,
    `documento` VARCHAR(50) NULL,
    `tipo_documento` INTEGER NULL,
    `status_pagamento` ENUM('Recebida', 'Paga', 'Em Aberto') NOT NULL,

    INDEX `id_pessoa`(`id_pessoa`),
    INDEX `id_produto`(`id_produto`),
    INDEX `id_veiculo`(`id_veiculo`),
    INDEX `tipo_documento`(`tipo_documento`),
    PRIMARY KEY (`id_transacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `login` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tipo_usuario` ENUM('Vendedor', 'Administrador') NOT NULL,
    `status` ENUM('Ativo', 'Inativo') NOT NULL,
    `salt` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `login`(`login`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veiculos` (
    `id_veiculo` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(100) NOT NULL,
    `marca` VARCHAR(50) NOT NULL,
    `ano` YEAR NOT NULL,
    `cor` VARCHAR(30) NULL,
    `valor_compra` DECIMAL(10, 2) NOT NULL,
    `valor_venda` DECIMAL(10, 2) NULL,
    `renavam` VARCHAR(20) NULL,
    `chassi` VARCHAR(20) NULL,
    `quilometragem` INTEGER NULL,
    `status` ENUM('vendido', 'disponivel', 'manutencao') NOT NULL,
    `tipo_combustivel` VARCHAR(20) NULL,
    `placa` VARCHAR(45) NOT NULL,

    INDEX `placa_UNIQUE`(`placa`),
    PRIMARY KEY (`id_veiculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `custos` ADD CONSTRAINT `custos_ibfk_1` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculos`(`id_veiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `custos` ADD CONSTRAINT `custos_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_ibfk_1` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculos`(`id_veiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_ibfk_3` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoas`(`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_ibfk_4` FOREIGN KEY (`tipo_documento`) REFERENCES `tipodocumento`(`id_tipo_doc`) ON DELETE NO ACTION ON UPDATE NO ACTION;

